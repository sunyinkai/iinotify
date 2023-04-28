using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Configuration;

namespace iinotify.Common
{
    public class ConfigurationReader<T> : IConfigurationReader<T> where T : new()
    {
        public ConfigurationReader()
        {
        }

        public T GetConfig()
        {
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            var model = new T();
            config.Build().Bind(model);
            return model;
        }
    }
}