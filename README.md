// Trying to build and implement Tiny URL kind of Application.

  Functional  : 
	    1) Giving a long url -> create a short url
	    2) Giving a short url -> redirect to the long url
	Non - Functional : 
	    1) Very low latency
	    2) Very high availability

routes : 
    POST /create-url
        params : long url
        status code : 201 created.
    GET /short-url
        status code : 301 permanent redirect
    
  Schema : 
      long url : string,
      short url : string
      {
        time stamps
      }
      
