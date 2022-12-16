Frågor och påståenden om användare och rättigheter i Ramirent-portalen.
Dessa användare och rättigheter kommer inte bara användas av portalen, utan av många kringliggande system.

# Stora frågeställningar alltigenom
1. Skall t.ex. 
    1. en kund-användare kunna ha olika roller innanför olika projekt eller avdelningar? "Användaradmin inom Avdelning 3", "Projektledare på Projekt 6"
    2. en ramirent-användare kunna ha olika roller innanför olika kunder? "Användaradmin åt Kund 4", "CO2-intresserad för Projekt 100".
2. Det kommer finnas roller och features som endast kommer vara tillgängliga för en viss typ av användare. Exempelvis kommer en kundanvändare aldrig kunna skapa en kund, En RamiRent-användare ska aldrig kunna "Returnera en hyrd produkt". Ramirentspecifika funktioner ska aldrig visas för en användaradministratör hos kunden och vice-versa.
3. Ska kunder kunna upprätta egna roller (i tillägg till några fördefinierade?) som bara finns tillgängliga för den kunden?
4. Vi ska förmodligen migrera många användare och kundobjekt från RamiConnect.Finns det en självklar 1-1-mappning mellan RamiConnects användarstruktur och den nya strukturen?
5. Skall en användares specifika rättigheter kunna styras på individnivå, eller kan de alltid deduceras från användarens roll? Dvs, ska man kunna lägga till/ta bort en eller flera specifika funktioner på en användare efter att roller tilldelats?

# Ramirentanvändare
1. En RamiRent-användare finns i RamiRents Azure AD.
2. Ska alla som finns i RamiRents AD använda portalen, eller ska den som inte är "registrerad" mötas av en "kontakta din chef"-uppmaning eller liknande?
    1. Beroende på svaret ovan. Vem registrerar en RamiRent-användare?
3. Ska den Ramirent-användare som ska kunna impersonera en kund-användare, kunna impersonera vilken kund-användare som helst, eller bör rollen vara begränsad innanför ett eller flera projekt eller organisationsenheter (kund/avdelning)-
4. Ska RamiRent-användare kunna impersonera andra RamiRent-användare? I så fall, vilka då? Alla?

# Kunder och kundens användare
1. Era kundnummer idag verkar betyda lite olika saker. Jag tyckte mig kunna skönja nivåerna Kund -> (Avdelning ->) Användare, i en strikt hierarkisk form. Dvs.en avdelning kan inte existera under flera kunder (rimligt), och en användare kan inte existera under flera avdelningar (vet ej hur rimligt).
2. Vem upprättar Kunden, dvs rötterna i hierarkin? Jag antar att det är en RamiRent-användare med behörigheten "Skapa kund" el likn. som kan göra detta. 
3. Vem upprättar Avdelningarna, om sådana ska finnas? Jag antar en RamiRent-användare med behörigheten "Skapa avdelning". (Observera att behörigheten förmodligen inte gäller alla Kunders organisationer)
4. Vem upprättar kundens projekt? Gör dem det själva? Gör RamiRent det? 
5. Ska kundanvändare kunna ha en roll som innebär att de impersonera andra användare på kunden/avdelningen/projektet? Ska de då kunna impersonera samtliga användare på kunden?
6. Ska det gå att begränsa på kundnivå vilka rättigheter/moduler som ska finnas tillgängliga, eller sker det bara på användarnivå?

# Om ovanstående påståenden i huvudsak är korrekta, så bör nedanstående gälla
1. En användare kan ha flera roller
2. En roll definierar en mängd funktioner (features)
3. En funktion kan vara applicerbar innanför ett scope (projekt, kund, etc)
4. Ett scope har en typ, t.ex. "Projekt". När en funktion med ett scope tilldelas en person (genom en roll), måste ett eller flera värden för scopet anges. För scopet Projekt kan ex.vis scopet "Projekt 1, Projekt 2" anges. 
5. Ett scopes tillåtna värden måste förmodligen baseras på administratörens rättigheter, samt mottagande användares rättigheter.
6. Vilka scopes som krävs när en roll tilldelas en användare, räknas ut transitivt genom att se på vilka funktioner som ingår i rollen, och vilka scopes dessa funktioner kräver.
7. Om en användare tilldelas en roll, får användaren rättighet
till alla features deklarerade i rollen.
8. Uppdateras rollen så förändras alla relaterade användares tillgångar.

# Andra intressanta frågeställningar
1. GDPR
    1. En användare måste kunna deaktiveras, utan att tas bort?
    2. En användare måste kunna tas bort?
    3. För att enkelt vara gdpr-compliant bör sådana operationer automatiseras.
    4. En användare måste kunna få ut all registrerad data vi har på användaren?

