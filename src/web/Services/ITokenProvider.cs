using System.Threading;
using System.Threading.Tasks;

namespace Aitgmbh.Tapio.Developerapp.Web.Services
{
    public interface ITokenProvider
    {
        Task<string> ReceiveTokenAsync<TScope>(TScope scope)
            where TScope : TapioScope;
    }
}
