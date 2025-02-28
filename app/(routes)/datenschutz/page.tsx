import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ContentContainer } from "../../components/ui/content-container";

export default function DatenschutzPage() {
  return (
    <ContentContainer className="py-12">
      <div className="flex flex-col md:flex-row gap-2 mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Startseite
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Datenschutz</span>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-lg font-medium mb-2">Allgemeine Hinweise</h3>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
              passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
              persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen 
              Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Datenerfassung auf dieser Website</h3>
            <p className="mb-2">
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
            </p>
            <p className="mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
              können Sie dem Impressum dieser Website entnehmen.
            </p>
            
            <p className="mb-2">
              <strong>Wie erfassen wir Ihre Daten?</strong>
            </p>
            <p className="mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
              z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
            <p className="mb-4">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
              IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder 
              Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>
            
            <p className="mb-2">
              <strong>Wofür nutzen wir Ihre Daten?</strong>
            </p>
            <p className="mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
              Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
            
            <p className="mb-2">
              <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
            </p>
            <p className="mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
              gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung 
              oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt 
              haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das 
              Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten 
              zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Hosting</h2>
            <p className="mb-4">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>
            
            <h3 className="text-lg font-medium mb-2">Externes Hosting</h3>
            <p className="mb-4">
              Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, 
              werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, 
              Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, 
              die über eine Website generiert werden, handeln.
            </p>
            <p className="mb-4">
              Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und 
              bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und 
              effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). 
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <h3 className="text-lg font-medium mb-2">Datenschutz</h3>
            <p className="mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln 
              Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften 
              sowie dieser Datenschutzerklärung.
            </p>
            <p className="mb-4">
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene 
              Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung 
              erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>
            <p className="mb-4">
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) 
              Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Hinweis zur verantwortlichen Stelle</h3>
            <p className="mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <p className="mb-4">
              Amrum Tourismus GmbH<br />
              Strandstraße 123<br />
              25946 Wittdün auf Amrum<br />
              <br />
              Telefon: +49 (0) 4682 12345<br />
              E-Mail: info@amrum-tourismus.de
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Datenerfassung auf dieser Website</h2>
            
            <h3 className="text-lg font-medium mb-2">Cookies</h3>
            <p className="mb-4">
              Unsere Internetseiten verwenden so genannte &quot;Cookies&quot;. Cookies sind kleine Datenpakete und richten 
              auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung 
              (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies 
              werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät 
              gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Analyse-Tools und Werbung</h2>
            
            <h3 className="text-lg font-medium mb-2">Google Analytics</h3>
            <p className="mb-4">
              Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland Limited 
              (&quot;Google&quot;), Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p className="mb-4">
              Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der Websitebesucher zu analysieren. 
              Hierbei erhält der Websitebetreiber verschiedene Nutzungsdaten, wie z.B. Seitenaufrufe, Verweildauer, 
              verwendete Betriebssysteme und Herkunft des Nutzers. Diese Daten werden von Google gegebenenfalls in einem 
              Profil zusammengefasst, das dem jeweiligen Nutzer bzw. dessen Endgerät zugeordnet ist.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Hinweis: Diese Datenschutzerklärung wurde zu Demonstrationszwecken erstellt und muss im Falle einer 
              tatsächlichen Veröffentlichung an die spezifischen Umstände angepasst werden. Dieser Text ersetzt keine 
              rechtliche Beratung und sollte vor Verwendung von einem Rechtsanwalt geprüft werden.
            </p>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
} 