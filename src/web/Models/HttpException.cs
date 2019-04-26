using System;
using System.Net;

namespace Aitgmbh.Tapio.Developerapp.Web.Models
{
    [Serializable]
    public class HttpException : Exception
    {
        public HttpStatusCode StatusCode { get; set; }

        public HttpException(HttpStatusCode statusCode)
        {
            StatusCode = statusCode;
        }
    }
}
