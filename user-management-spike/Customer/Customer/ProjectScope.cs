using Portal;

using UserModule;

namespace Customer
{
    public class ProjectScope : IScope<Project>
    {
        public HashSet<Project> AvailableValues(IUser user)
        {
            user.ScopesInRole<Member>()
        }
    }

    public class Member : IRole
    {
        public HashSet<IFeature> Features => new()
        {
            new GeneralAccess()
        }
    }

    internal class GeneralAccess : IFeature
    {
    }
}