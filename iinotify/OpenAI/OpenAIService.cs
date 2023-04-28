using Azure;
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

        async public Task<string> Chat(string message)
        {
            Response<ChatCompletions> responseWithoutStream = await this._client.GetChatCompletionsAsync(
                "gpt35",
                new ChatCompletionsOptions()
                {
                    Messages =
                    {
            new ChatMessage(ChatRole.System, @"You are an AI assistant that helps people find information."),
            new ChatMessage(ChatRole.User, message),
                    },
                    Temperature = (float)0.7,
                    MaxTokens = 1000,
                    NucleusSamplingFactor = (float)0.95,
                    FrequencyPenalty = 0,
                    PresencePenalty = 0,
                });

            ChatCompletions completions = responseWithoutStream.Value;
            return completions.Choices[0].Message.Content;
        }
    }
}