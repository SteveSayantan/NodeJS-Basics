/* 
    The method header is only present in the req headers.

    1. Get request has no body, and it is idempotent.

    2. Post method is not idempotent.

    3. Put request is used to create or fully update existing data. It is idempotent.

    4. Patch request is used to partially update data. It may or may not be idempotent.

    5. Delete method is idempotent.
    
    6. Head request is used to get headers only, it does not has a body. The response for a
       Head request should also not have a body.

    7. Options request is used to ask for available communication options (methods,CORS,headers), it has no body.
        The response for it may or may not have a body. It is idempotent. Used for preflight calls.
*/     