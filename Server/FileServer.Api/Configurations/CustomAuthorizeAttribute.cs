using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FileServer.Configurations
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
    {

        public void OnAuthorization(AuthorizationFilterContext filterContext)
        {
            // TODO: Khi thành công phải so lại tên của user vs tên lưu trong database
            if (true)
            {
                //base.OnAuthorization(filterContext);
            }
            else
            {
                this.HandleUnauthorizedRequest(filterContext);
            }
        }

        protected void HandleUnauthorizedRequest(AuthorizationFilterContext filterContext)
        { 
            //filterContext.Controller.ViewData["AuthorizationError"] = "You don't have rights to take actions";
        }
    }
}
