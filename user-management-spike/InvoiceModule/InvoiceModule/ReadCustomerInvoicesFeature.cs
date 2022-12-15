using Customer;

using Portal;

using UserModule;

namespace InvoiceModule
{
    public class ModuleDefinition : IModule
    {
        public HashSet<IFeature> Features => new()
        {
            new ReadInvoicesFeature(),
        };

        public HashSet<IScope> Scopes => new();
    }

    public class ReadInvoicesFeature : IFeature
    {
        public List<HashSet<IScope>> RequiredScopes => new()
        {
            new(){ new OrganizationScope() },
            new(){ new ProjectScope() }
        };
    }
}