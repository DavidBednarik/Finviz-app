export interface ImageNetCategory {
  name: string;
  size: number;
  children?: ImageNetCategory[];
}

export interface FlattenedImageNet {
  name: string;
  size: number;
}
