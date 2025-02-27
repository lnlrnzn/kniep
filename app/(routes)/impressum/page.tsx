import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ContentContainer } from "../../components/ui/content-container";

export default function ImpressumPage() {
  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Impressum</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Impressum</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-2">
              <p>Amrum Tourismus GmbH</p>
              <p>Strandstraße 123</p>
              <p>25946 Wittdün auf Amrum</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Kontakt</h2>
            <div className="space-y-2">
              <p>Telefon: +49 (0) 4682 12345</p>
              <p>E-Mail: info@amrum-tourismus.de</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Vertreten durch</h2>
            <p>Geschäftsführer: Maren Meerblick</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Registereintrag</h2>
            <div className="space-y-2">
              <p>Eintragung im Handelsregister.</p>
              <p>Registergericht: Amtsgericht Husum</p>
              <p>Registernummer: HRB 12345</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Umsatzsteuer-ID</h2>
            <div className="space-y-2">
              <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
              <p>DE 123456789</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Redaktionell verantwortlich</h2>
            <div className="space-y-2">
              <p>Maren Meerblick</p>
              <p>Strandstraße 123</p>
              <p>25946 Wittdün auf Amrum</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Streitschlichtung</h2>
            <p className="mb-2">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              <Link href="https://ec.europa.eu/consumers/odr/" className="text-primary ml-1 hover:underline">
                https://ec.europa.eu/consumers/odr/
              </Link>
            </p>
            <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Haftung für Inhalte</h2>
            <p className="mb-2">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
              der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
              verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
              Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="mt-2">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
              einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
              derartige Links umgehend entfernen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
              deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
              außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
              Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-2">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
              Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
              trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
              Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Hinweis: Dies ist ein fiktives Impressum für Demonstrationszwecke. Im Falle einer tatsächlichen
            Websiteveröffentlichung muss es mit den korrekten Angaben des Websitebetreibers ersetzt werden.
          </p>
        </div>
      </div>
    </ContentContainer>
  );
} 