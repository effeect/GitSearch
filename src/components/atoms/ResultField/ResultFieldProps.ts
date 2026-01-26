// Type defintions for the Results field
export type ResultFieldProps = {
  index: number;
  repo: any; /* Note, set to any for allow for below to be used*/
  type: string;
};

export type Commit = {
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  commit: { message: string; url: string };
};

export type Repo = {
  full_name: string;
  description: string;
  stargazers_count: string;
  forks: string;
  html_url: string;
  topics: string[];
};

export type PR = {
  html_url: string;
  body: string;
  title: string;
  created_at: Date;
  user: {
    login: string;
    html_url: string;
  };
};
