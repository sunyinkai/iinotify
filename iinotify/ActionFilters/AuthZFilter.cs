using iinotify.Common.Configuraitons;
using iinotify.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace iinotify.ActionFilters
{
    public class AuthZAttribute : TypeFilterAttribute
    {
        public AuthZAttribute() : base(typeof(AuthZFilter))
        {
        }
    }

    public class AuthZFilter : IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var _configurationReader = new ConfigurationReader<AuthConfigurations>();
            var configurationReader=_configurationReader.GetConfig();
            var userIdList = configurationReader.AllowedList;

            var currentUser = context.HttpContext.User;
            if (!currentUser.HasClaim(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier" && userIdList.Contains(c.Value)))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}