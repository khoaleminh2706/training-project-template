using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileServer
{
    public class UserContext : Shared.IUserContext
    {
        private IHttpContextAccessor HttpContextAccesor { get; }
        public UserContext(IHttpContextAccessor httpContextAccesor)
        {
            HttpContextAccesor = httpContextAccesor;
        }

        public string GetUserId()
        {
            return HttpContextAccesor; //return from HttpContextAccesor
        }
    }
}
