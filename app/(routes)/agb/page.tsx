import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ContentContainer } from "../../components/ui/content-container";

export default function AGBPage() {
  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Allgemeine Geschäftsbedingungen</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Allgemeine Geschäftsbedingungen</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Geltungsbereich</h2>
            <p className="mb-4">
              Die nachstehenden Allgemeinen Geschäftsbedingungen gelten für alle Verträge, Lieferungen und sonstigen 
              Leistungen der Amrum Tourismus GmbH, Strandstraße 123, 25946 Wittdün auf Amrum (nachfolgend "Anbieter" genannt).
            </p>
            <p className="mb-4">
              Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung 
              ausdrücklich schriftlich zu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Vertragsschluss</h2>
            <p className="mb-4">
              Die Präsentation unserer Dienstleistungen auf unserer Website stellt kein bindendes Angebot unsererseits dar. 
              Erst Ihre Buchung einer Dienstleistung ist ein bindendes Angebot nach § 145 BGB. Im Falle der Annahme dieses Angebots 
              senden wir Ihnen eine Buchungsbestätigung per E-Mail zu. Hierdurch kommt der Vertrag zustande.
            </p>
            <p className="mb-4">
              Bei Buchungen über unsere Webseite stellt die Bestätigung des Eingangs Ihrer Buchung noch keine 
              Annahme des Vertragsangebots dar. Ein Vertrag kommt erst durch unsere Buchungsbestätigung zustande.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Leistungen und Preise</h2>
            <p className="mb-4">
              Der Umfang der vertraglichen Leistungen ergibt sich aus der Leistungsbeschreibung in unserem Angebot 
              sowie aus den Angaben in der Buchungsbestätigung. Nebenabreden, die den Umfang der vertraglichen 
              Leistungen verändern, bedürfen einer ausdrücklichen schriftlichen Bestätigung.
            </p>
            <p className="mb-4">
              Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Zusätzliche Kosten wie 
              die Kurtaxe werden gegebenenfalls separat ausgewiesen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Zahlungsbedingungen</h2>
            <p className="mb-4">
              Bei Vertragsschluss ist eine Anzahlung in Höhe von 20% des Gesamtpreises zu leisten. Die Restzahlung ist 
              spätestens 30 Tage vor Beginn der Leistung fällig. Bei Buchungen, die weniger als 30 Tage vor Leistungsbeginn 
              erfolgen, ist der gesamte Reisepreis sofort fällig.
            </p>
            <p className="mb-4">
              Leistet der Kunde die Anzahlung und/oder die Restzahlung nicht entsprechend den vereinbarten 
              Zahlungsfälligkeiten, so sind wir berechtigt, nach Mahnung mit Fristsetzung vom Reisevertrag zurückzutreten 
              und den Kunden mit Rücktrittskosten gemäß Ziffer 5 zu belasten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Rücktritt durch den Kunden, Umbuchungen, Ersatzpersonen</h2>
            <p className="mb-4">
              Der Kunde kann jederzeit vor Beginn der Leistung zurücktreten. Der Rücktritt ist gegenüber dem Anbieter zu erklären. 
              Falls die Leistung über einen Reisevermittler gebucht wurde, kann der Rücktritt auch diesem gegenüber erklärt werden. 
              Dem Kunden wird empfohlen, den Rücktritt schriftlich zu erklären.
            </p>
            <p className="mb-4">
              Tritt der Kunde vor Leistungsbeginn zurück oder tritt er die Reise nicht an, so verliert der Anbieter den Anspruch 
              auf den Preis. Stattdessen kann der Anbieter eine angemessene Entschädigung verlangen.
            </p>
            <p className="mb-4">
              Der Anbieter hat die nachfolgenden Entschädigungspauschalen unter Berücksichtigung des Zeitraums zwischen der 
              Rücktrittserklärung und dem Reisebeginn sowie unter Berücksichtigung der erwarteten Ersparnis von Aufwendungen 
              und des erwarteten Erwerbs durch anderweitige Verwendungen der Reiseleistungen festgelegt:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>bis 45 Tage vor Leistungsbeginn: 20% des Gesamtpreises</li>
              <li>vom 44. bis 30. Tag vor Leistungsbeginn: 30% des Gesamtpreises</li>
              <li>vom 29. bis 15. Tag vor Leistungsbeginn: 50% des Gesamtpreises</li>
              <li>vom 14. bis 7. Tag vor Leistungsbeginn: 75% des Gesamtpreises</li>
              <li>ab dem 6. Tag vor Leistungsbeginn und bei Nichtantritt: 90% des Gesamtpreises</li>
            </ul>
            <p className="mb-4">
              Dem Kunden steht der Nachweis frei, dass dem Anbieter kein oder ein wesentlich geringerer Schaden entstanden ist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Rücktritt und Kündigung durch den Anbieter</h2>
            <p className="mb-4">
              Der Anbieter kann in folgenden Fällen vor Beginn der Leistung vom Vertrag zurücktreten oder nach Beginn der 
              Leistung den Vertrag kündigen:
            </p>
            <p className="mb-4">
              a) Ohne Einhaltung einer Frist: Wenn der Kunde die Durchführung der Leistung ungeachtet einer Abmahnung des Anbieters 
              nachhaltig stört oder wenn er sich in solchem Maße vertragswidrig verhält, dass die sofortige Aufhebung des Vertrages 
              gerechtfertigt ist.
            </p>
            <p className="mb-4">
              b) Bis 2 Wochen vor Leistungsbeginn: Bei Nichterreichen einer ausgeschriebenen oder behördlich festgelegten 
              Mindestteilnehmerzahl, wenn in der Leistungsausschreibung für die entsprechende Leistung auf eine Mindestteilnehmerzahl 
              hingewiesen wird.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Haftung des Anbieters</h2>
            <p className="mb-4">
              Der Anbieter haftet im Rahmen der Sorgfaltspflicht eines ordentlichen Kaufmanns für:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li>Die gewissenhafte Vorbereitung der angebotenen Leistungen</li>
              <li>Die sorgfältige Auswahl und Überwachung der Leistungsträger</li>
              <li>Die Richtigkeit der Beschreibung aller angegebenen Leistungen</li>
              <li>Die ordnungsgemäße Erbringung der vertraglich vereinbarten Leistungen</li>
            </ul>
            <p className="mb-4">
              Der Anbieter haftet nicht für Leistungsstörungen im Zusammenhang mit Leistungen, die als Fremdleistungen lediglich 
              vermittelt werden (z.B. Sportveranstaltungen, Theaterbesuche, Ausstellungen) und die in der Leistungsbeschreibung 
              ausdrücklich als Fremdleistungen gekennzeichnet werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Schlussbestimmungen</h2>
            <p className="mb-4">
              Auf das Vertragsverhältnis zwischen dem Kunden und dem Anbieter findet ausschließlich deutsches Recht Anwendung. 
              Dies gilt auch für das gesamte Rechtsverhältnis.
            </p>
            <p className="mb-4">
              Soweit bei Klagen des Kunden gegen den Anbieter im Ausland für die Haftung des Anbieters dem Grunde nach nicht 
              deutsches Recht angewendet wird, findet bezüglich der Rechtsfolgen, insbesondere hinsichtlich Art, Umfang und 
              Höhe von Ansprüchen des Kunden, ausschließlich deutsches Recht Anwendung.
            </p>
            <p className="mb-4">
              Der Kunde kann den Anbieter nur an dessen Sitz verklagen.
            </p>
            <p className="mb-4">
              Für Klagen des Anbieters gegen den Kunden ist der Wohnsitz des Kunden maßgebend. Für Klagen gegen Kunden bzw. 
              Vertragspartner, die Kaufleute, juristische Personen des öffentlichen oder privaten Rechts oder Personen sind, 
              die ihren Wohnsitz oder gewöhnlichen Aufenthaltsort im Ausland haben oder deren Wohnsitz oder gewöhnlicher 
              Aufenthalt im Zeitpunkt der Klageerhebung nicht bekannt ist, wird als Gerichtsstand der Sitz des Anbieters vereinbart.
            </p>
            <p className="mb-4">
              Die vorstehenden Bestimmungen gelten nicht, wenn und insoweit auf den Vertrag anwendbare, nicht abdingbare 
              Bestimmungen der Europäischen Union oder andere internationale Bestimmungen anwendbar sind.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Stand: Mai 2025
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Hinweis: Diese AGB wurden zu Demonstrationszwecken erstellt und müssen im Falle einer tatsächlichen 
              Veröffentlichung an die spezifischen Umstände angepasst werden. Dieser Text ersetzt keine rechtliche 
              Beratung und sollte vor Verwendung von einem Rechtsanwalt geprüft werden.
            </p>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
} 