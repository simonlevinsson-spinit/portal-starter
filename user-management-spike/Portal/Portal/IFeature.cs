namespace UserModule
{
    public interface IFeature
    {
        List<HashSet<IScope>> RequiredScopes { get; }
    }
}