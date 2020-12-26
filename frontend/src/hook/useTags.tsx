import { useState } from "react";

export const useTags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const addTagHandler = (tag: string) => setTags((tgs) => [...tgs, tag]);
  const removeTagHandler = (index: number) =>
    setTags((tags) => tags.filter((_, idx) => idx !== index));

  return { tags, addTagHandler, removeTagHandler };
};
