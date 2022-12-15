using UserModule;

namespace Portal
{

    public interface IRole
    {
        HashSet<IFeature> Features { get; }
    }
}