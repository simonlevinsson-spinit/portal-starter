using UserModule;

namespace Portal
{
    public interface IModule
    {
        HashSet<IFeature> Features { get; }
        HashSet<IScope> Scopes { get; }
    }

    
}