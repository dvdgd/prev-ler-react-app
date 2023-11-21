interface IBaseErrorProps {
  title: string;
  description?: string | undefined;
}

export class BaseError extends Error {
  title: string;
  descripion?: string;
  constructor({ title, description }: IBaseErrorProps) {
    super(title);
    this.title = title;
    this.descripion = description;
  }
}
