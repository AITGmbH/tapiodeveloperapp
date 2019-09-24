using System;
using System.Net;
using System.Runtime.Serialization;

namespace Aitgmbh.Tapio.Developerapp.Web.Models
{
    [Serializable]
    public class HttpException : Exception
    {
        public HttpException(HttpStatusCode statusCode)
        {
            StatusCode = statusCode;
        }

        private HttpException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
            StatusCode = (HttpStatusCode)info.GetValue(nameof(StatusCode), typeof(HttpStatusCode));
        }

        public HttpStatusCode StatusCode { get; set; }


        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            info.AddValue(nameof(StatusCode), StatusCode);
            base.GetObjectData(info, context);
        }
    }
}
