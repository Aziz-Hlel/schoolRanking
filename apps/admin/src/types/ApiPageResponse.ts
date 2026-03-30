export type PageableApiResponse = {
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: false;
    };
    offset: number;
    paged: boolean;
    unpaged: false;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: false;
  };
  numberOfElements: number;
  empty: false;
};

export type ApiPageResponse<T> = { content: T[] } & PageableApiResponse;

export const initialPageResponse: PageableApiResponse = {
  pageable: {
    pageNumber: 0,
    pageSize: 0,
    sort: {
      empty: false,
      sorted: false,
      unsorted: false,
    },
    offset: 0,
    paged: false,
    unpaged: false,
  },
  last: false,
  totalElements: 0,
  totalPages: 0,
  first: false,
  size: 0,
  number: 0,
  sort: {
    empty: false,
    sorted: false,
    unsorted: false,
  },
  numberOfElements: 0,
  empty: false,
};
