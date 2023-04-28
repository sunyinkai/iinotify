namespace iinotify.OpenAI
{
    public interface IOpenAIService
    {
        public Task<string> Chat(string messages);
    }
}