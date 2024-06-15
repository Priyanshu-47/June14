using System.Runtime.Serialization;

namespace JuneCC.Exceptions
{
    [Serializable]
    internal class NoSuchMemberException : Exception
    {
        public NoSuchMemberException()
        {
        }

        public NoSuchMemberException(string? message) : base(message)
        {
        }

        public NoSuchMemberException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected NoSuchMemberException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}