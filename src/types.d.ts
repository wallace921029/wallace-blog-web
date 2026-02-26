declare module 'front-matter' {
  interface FrontMatterResult<T> {
    attributes: T;
    body: string;
    bodyBegin: number;
    frontmatter?: string;
  }
  function fm<T = unknown>(content: string): FrontMatterResult<T>;
  export = fm;
}
