export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: string;
}

export const promptTemplates: PromptTemplate[] = [
  {
    id: "fantasy",
    title: "Fantasy Adventure",
    description: "A magical quest in an enchanted world.",
    prompt: "A young hero begins a magical adventure in a mystical kingdom filled with dragons, ancient magic, and hidden secrets.",
    icon: "🐉"
  },
  {
    id: "scifi",
    title: "Sci-Fi Space Mission",
    description: "Explore unknown galaxies and alien worlds.",
    prompt: "A crew of astronauts discovers a mysterious signal from a distant planet that may change humanity forever.",
    icon: "🚀"
  },
  {
    id: "mystery",
    title: "Mystery Detective",
    description: "Solve a thrilling investigation.",
    prompt: "A brilliant detective investigates a strange disappearance in a foggy city full of secrets.",
    icon: "🕵️"
  },
  {
    id: "horror",
    title: "Horror Night Story",
    description: "A terrifying story set in the dark.",
    prompt: "A group of friends enters an abandoned house at night and soon realizes something inside is watching them.",
    icon: "👻"
  }
];
