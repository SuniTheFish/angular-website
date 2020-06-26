export interface Project {
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  [key: string]: string;
}
