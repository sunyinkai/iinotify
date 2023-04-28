using Azure.AI.OpenAI;
using iinotify.Common;
using iinotify.Common.Configuraitons;

namespace iinotify.OpenAI
{
    public class OpenAIService : IOpenAIService
    {
        private readonly OpenAIClient _client;
        private readonly IConfigurationReader<OpenAIConfigurations> _configurationReader;

        public OpenAIService()
        {
            _configurationReader = new ConfigurationReader<OpenAIConfigurations>();
            var configReader = _configurationReader.GetConfig();
            this._client = new OpenAIClient(new Uri(configReader.OpenAIEndpoint), new Azure.AzureKeyCredential(configReader.OpenAICredential));
        }

        public string Chat(string message)
        {
            var response = this._client.GetCompletions("gpt35", message);
            return response.Value.Choices[0].Text;
        }
    }
}