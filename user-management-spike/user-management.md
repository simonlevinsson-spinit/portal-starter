Frågor och påståenden om användare och rättigheter i RamiRent-portalen.

# Stora frågeställningar alltigenom

1. Skall rättigheter för system som ännu inte inlemmats i portalen också kunna administreras från portalen? (Det lät på Martin som att denna databas för rättigheter skall användas även för andra system,
   så som t.ex. utbildningsportalen.) 1. Om ovan gäller, ska kringliggande system dynamiskt annonsera vilka funktioner/roller/scope de exponerar, eller är det ok att de kompileras in i portalen?
2. Det kommer finnas roller och funktioner som endast kommer vara tillgängliga för vissa typer av användare. Exempelvis kommer en kunds användare aldrig kunna skapa en ny kund, och en RamiRent-användare ska aldrig kunna "Returnera en hyrd produkt". Alltså, RamiRenttexklusivaa funktioner ska aldrig visas för en kunds användaradministratör, och vice-versa.
3. Vi ska förmodligen migrera många användare och kundobjekt från RamiConnect. Finns det en självklar 1-1-mappning mellan RamiConnects användarstruktur och den nya strukturen?
4. Skall en användares specifika rättigheter kunna styras på individnivå, eller kan de alltid härledas från användarens roll? Dvs, ska man kunna lägga till/ta bort en eller flera specifika funktioner på en användare efter att roller tilldelats?
5. Det är väl så, att om en roll uppdateras så påverkar det alla användare som innehar denna roll?
6. Skall det sparas historik på alla ändringar som görs av olika personers rättigheter?

# Ramirentanvändare

1. Skall alla som finns i RamiRents AD använda portalen, eller ska den som inte är "registrerad" mötas av en "kontakta din chef"-uppmaning eller liknande?
   1. Beroende på svaret ovan: Vem registrerar en RamiRent-användare i systemet?
2. Skall en RamiRent-användare kunna ha olika roller innanför olika kunder/projekt? "Användaradmin åt Kund 4", "CO2-intresserad för Projekt 100".
3. Skall den Ramirent-användare som ska kunna impersonera en kundanvändare, kunna impersonera vilken kundanvändare som helst, eller bör rollen vara begränsad (som jag beskrev mer generellt i punkt 2) innanför ett eller flera projekt eller organisationsenheter (kund/avdelning)?
4. Skall RamiRent-användare kunna impersonera andra RamiRent-användare? I så fall, vilka då? Alla?

# Kunder och kundens användare

1. Era kundnummer idag verkar betyda lite olika saker. Jag tyckte mig kunna skönja nivåerna Kund -> (Avdelning ->) Användare, i en strikt hierarkisk form. Dvs. en avdelning kan inte existera under flera kunder (rimligt), och en användare kan inte existera under flera avdelningar (vet ej hur rimligt).
2. Vem upprättar Kunden, dvs rötterna i hierarkin? Jag antar att det är en RamiRent-användare med behörigheten "Skapa kund" el likn. som kan göra detta.
3. Vem upprättar Avdelningarna, om sådana ska finnas? Jag antar en RamiRent-användare eller kundanvändare med behörigheten "Skapa avdelning". (Observera att behörigheten förmodligen inte gäller alla Kunders organisationer)
4. Vem upprättar kundens projekt? Gör de det själva? Gör RamiRent det?
5. Skall en kundanvändare kunna ha olika roller innanför olika projekt eller avdelningar? "Användaradmin inom Avdelning 3", "Projektledare på Projekt 6"
6. Skall kundanvändare kunna ha en roll som innebär att de kan impersonera andra användare på kunden/avdelningen/projektet? Ska de då kunna impersonera samtliga användare på kunden?
7. Skall det gå att begränsa på kundnivå vilka rättigheter/moduler som ska finnas tillgängliga för den kunden, eller sker det bara på användarnivå?
8. Skall kunder kunna upprätta egna roller (i tillägg till några fördefinierade) som bara finns tillgängliga för den kunden?
9. Skall kunder kunna redigera de fördefinierade rollerna, så att de får en ny betydelse för just denna kund?
10. Är inte "kund" ett jättefult ord nu när man sagt det så många gånger?

# Andra intressanta frågeställningar, vet ej om det ingår i uppdraget.

1. GDPR
   1. En användare måste kunna deaktiveras, utan att tas bort?
   2. En användare måste kunna tas bort?
   3. För att enkelt vara gdpr-compliant bör sådana operationer automatiseras.
   4. En användare måste kunna få ut all registrerad data vi har på hen?

# Om ovanstående påståenden i huvudsak är korrekta, så bör nedanstående gälla (detta är mer anteckningar för mig själv än något RamiRent behöver svara på)

1. En användare kan ha flera roller
2. En roll definierar en mängd funktioner (features)
3. En funktion kan vara applicerbar innanför ett scope (projekt, kund, etc)
4. Ett scope har en typ, t.ex. "Projekt". När en funktion med ett scope tilldelas en person (genom en roll), måste ett eller flera värden för scopet anges. För scopet Projekt kan ex.vis scopet "Projekt 1, Projekt 2" anges.
5. Ett scopes tillåtna värden måste förmodligen baseras på administratörens rättigheter, samt mottagande användares rättigheter.
6. Vilka scopes som krävs när en roll tilldelas en användare, räknas ut transitivt genom att se på vilka funktioner som ingår i rollen, och vilka scopes dessa funktioner kräver.
7. Om en användare tilldelas en roll, får användaren rättighet till alla features deklarerade i rollen.
