/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/emails": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.emails.id"];
          email?: parameters["rowFilter.emails.email"];
          zip?: parameters["rowFilter.emails.zip"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["emails"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** emails */
          emails?: definitions["emails"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.emails.id"];
          email?: parameters["rowFilter.emails.email"];
          zip?: parameters["rowFilter.emails.zip"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.emails.id"];
          email?: parameters["rowFilter.emails.email"];
          zip?: parameters["rowFilter.emails.zip"];
        };
        body: {
          /** emails */
          emails?: definitions["emails"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/citext_hash_extended": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: bigint */
            "": number;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/regexp_split_to_table": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/replace": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_ge": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: inet */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citextsend": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citextin": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: cstring */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_hash": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_pattern_cmp": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_pattern_ge": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/texticlike": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_smaller": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/max": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/regexp_split_to_array": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/split_part": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: integer */
            "": number;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/regexp_replace": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_eq": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/strpos": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_pattern_gt": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_le": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citextout": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/regexp_match": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/texticregexeq": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/regexp_matches": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_pattern_lt": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_cmp": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/min": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/texticnlike": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_lt": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/texticregexne": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/translate": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: text */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_pattern_le": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_gt": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_ne": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citext_larger": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: public.citext */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/citextrecv": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: internal */
            "": string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  emails: {
    /**
     * Format: integer
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** Format: public.email */
    email: string;
    /** Format: public.zip */
    zip: string;
  };
}

export interface parameters {
  /** @description Preference */
  preferParams: "params=single-object";
  /** @description Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** @description Preference */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description emails */
  "body.emails": definitions["emails"];
  /** Format: integer */
  "rowFilter.emails.id": string;
  /** Format: public.email */
  "rowFilter.emails.email": string;
  /** Format: public.zip */
  "rowFilter.emails.zip": string;
}

export interface operations {}

export interface external {}
