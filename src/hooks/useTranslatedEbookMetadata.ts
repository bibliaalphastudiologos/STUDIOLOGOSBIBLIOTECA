import { useEffect, useMemo, useState } from "react";
import { translateText } from "../lib/translationService";
import { type Ebook, type StudioChapter } from "../studioTypes";

interface TranslationState {
  title?: string;
  description?: string;
  longDescription?: string;
  authorContext?: string;
  chapterTitles: Record<string, string>;
  loading: boolean;
}

const PORTUGUESE_LANGUAGE_PATTERN = /portugu[eê]s|portuguese|pt-br|brasil/i;

export function shouldTranslateEbook(ebook: Ebook): boolean {
  return Boolean(
    ebook.translationAvailable ||
    (ebook.originalLanguage && !PORTUGUESE_LANGUAGE_PATTERN.test(ebook.originalLanguage)),
  );
}

function uniqueChapters(chapters: StudioChapter[]): StudioChapter[] {
  const seen = new Set<string>();
  return chapters.filter((chapter) => {
    if (seen.has(chapter.id)) return false;
    seen.add(chapter.id);
    return Boolean(chapter.title.trim());
  });
}

export function useTranslatedEbookMetadata(
  ebook: Ebook,
  chapters: StudioChapter[],
  enabled = true,
) {
  const needsTranslation = enabled && shouldTranslateEbook(ebook);
  const chapterSignature = useMemo(
    () => chapters.map((chapter) => `${chapter.id}:${chapter.title}`).join("|"),
    [chapters],
  );
  const [state, setState] = useState<TranslationState>({
    chapterTitles: {},
    loading: false,
  });

  useEffect(() => {
    let cancelled = false;

    if (!needsTranslation) {
      setState({ chapterTitles: {}, loading: false });
      return () => {
        cancelled = true;
      };
    }

    const translate = async () => {
      setState((current) => ({ ...current, loading: true }));

      const textFields = [
        ["title", ebook.title],
        ["description", ebook.description],
        ["longDescription", ebook.longDescription],
        ["authorContext", ebook.authorContext],
      ] as const;

      const fieldResults = await Promise.allSettled(
        textFields.map(async ([field, text]) => {
          const translated = await translateText(ebook.id, field, text);
          return [field, translated] as const;
        }),
      );

      const chapterResults = await Promise.allSettled(
        uniqueChapters(chapters).map(async (chapter) => {
          const translated = await translateText(ebook.id, `chapter-title-${chapter.id}`, chapter.title);
          return [chapter.id, translated] as const;
        }),
      );

      if (cancelled) return;

      const next: TranslationState = {
        chapterTitles: {},
        loading: false,
      };

      fieldResults.forEach((result) => {
        if (result.status === "fulfilled") {
          const [field, translated] = result.value;
          next[field] = translated;
        }
      });

      chapterResults.forEach((result) => {
        if (result.status === "fulfilled") {
          const [chapterId, translated] = result.value;
          next.chapterTitles[chapterId] = translated;
        }
      });

      setState(next);
    };

    translate();

    return () => {
      cancelled = true;
    };
  }, [
    needsTranslation,
    ebook.id,
    ebook.title,
    ebook.description,
    ebook.longDescription,
    ebook.authorContext,
    chapterSignature,
  ]);

  return {
    ...state,
    needsTranslation,
    displayTitle: state.title || ebook.title,
    displayDescription: state.description || ebook.description,
    displayLongDescription: state.longDescription || ebook.longDescription,
    displayAuthorContext: state.authorContext || ebook.authorContext,
    getChapterTitle: (chapter: StudioChapter) => state.chapterTitles[chapter.id] || chapter.title,
  };
}
