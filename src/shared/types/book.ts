export type Book = {
  title: string;
  description: string;
  authors: string[];
  price: number;
  salePrice?: number;
  thumbnail?: string;
  url?: string;
};

export enum BookSearchType {
  TITLE = 'title',
  PUBLISHER = 'publisher',
  PERSON = 'person',
}

export enum BookSortType {
  ACCURACY = 'accuracy',
  LATEST = 'latest',
}
