# Description Textuelle de la Demo - SonarQube
## Groupe 5 | SNDAK11

---

## Objectif de la demo

Montrer le fonctionnement complet de SonarQube : de l'installation au resultat d'analyse, en passant par la configuration et l'interpretation des resultats.

---

## Pre-requis

- Docker installe et fonctionnel
- SonarScanner CLI installe (ou utilisation via Docker)
- Un projet source avec du code Java
- Acces reseau sur le port 9000

---

## Etape 1 - Lancer SonarQube avec Docker

**Action** : Lancement d'un conteneur SonarQube via Docker.

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
```

**Resultat** : Le serveur SonarQube demarre et devient accessible sur http://localhost:9000

![Terminal Docker run](captures/01_docker_run_terminal.png)

---

## Etape 2 - Connexion a SonarQube

**Action** : Ouverture du navigateur sur http://localhost:9000 et connexion avec les identifiants par defaut (admin/admin), puis changement du mot de passe.

![Page de login SonarQube](captures/02_sonarqube_login_page.png)

![Login admin avec identifiants](captures/03_login_admin.png)

**Resultat** : Acces au tableau de bord de SonarQube.

---

## Etape 3 - Decouverte du Dashboard projets

**Action** : Apres connexion, on accede a la liste des projets.

![Dashboard projets](captures/04_dashboard_projects.png)

---

## Etape 4 - Creation d'un projet

**Action** : Creation manuelle d'un projet dans l'interface SonarQube.
- Cliquer sur "Create Project"
- Renseigner le Project Key : `demo-sonarqube`
- Renseigner le Display Name : `Demo SonarQube Groupe 5`

![Formulaire de creation de projet](captures/05_create_project_form.png)

---

## Etape 5 - Preparation du code source

**Action** : Utilisation d'un projet Java avec des defauts volontaires pour la demo.

Fichier `sonar-project.properties` :
```properties
sonar.projectKey=demo-sonarqube
sonar.projectName=Demo SonarQube Groupe 5
sonar.projectVersion=1.0
sonar.sources=src
sonar.sourceEncoding=UTF-8
sonar.host.url=http://localhost:9000
```

Code Java avec des problemes volontaires (Bug, Code Smells, Security Hotspot) :
```java
public class DemoSonar {
    private String unused = "test";  // Code smell: variable inutilisee

    public void process(int x) {     // Code smell: complexite cognitive
        if (x > 0) {
            if (x > 10) {
                if (x > 100) { ... }
            }
        }
    }

    public void query(String userInput) {  // SQL injection potentielle
        String sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
    }

    public String getPassword() {     // Security hotspot: mot de passe en dur
        String password = "admin123";
        return password;
    }

    public void nullPointerRisk() {   // Bug: NullPointerException
        String str = null;
        System.out.println(str.length());
    }
}
```

---

## Etape 6 - Execution du SonarScanner

**Action** : Lancement de l'analyse depuis le terminal.

```bash
sonar-scanner -Dsonar.token=$SONAR_TOKEN
```

![Scanner execution - debut](captures/09_scanner_execution_start.png)

**Resultat** : L'analyse s'execute et affiche "EXECUTION SUCCESS".

![Scanner execution - SUCCESS](captures/10_scanner_execution_success.png)

---

## Etape 7 - Consultation des resultats - Dashboard projet

**Action** : Retour sur l'interface web pour voir les resultats du projet.

![Dashboard du projet](captures/11_project_dashboard.png)

**Resultats affiches** :
- **Quality Gate** : Passed (vert)
- **1 Bug** detecte (NullPointerException) - Reliability C
- **0 Vulnerabilities** - Security A
- **1 Security Hotspot** (mot de passe en dur) - Security Review E (0% reviewed)
- **16 Code Smells** - Maintainability C
- **2h 32min** de dette technique
- **0.0%** de couverture (pas de tests)
- **0.0%** de duplications

---

## Etape 8 - Exploration des Issues

**Action** : Navigation dans la liste des issues detectees.

![Liste des issues](captures/13_issues_list.png)

On peut filtrer par type (Bug, Code Smell, Vulnerability) et par severite.

### Detail d'un Bug (NullPointerException)

![Detail Bug](captures/14_issue_detail_bug.png)

SonarQube montre :
- La ligne exacte du probleme
- Le message : "A NullPointerException could be thrown; str is nullable here"
- Le flow : 'str' is null (ligne 54) -> 'str' is dereferenced (ligne 55)

### Detail d'un Code Smell

![Detail Code Smell](captures/15_issue_detail_code_smell.png)

Exemples detectes :
- "Remove this unused private field" (variable non utilisee)
- "Replace this use of System.out by a logger"
- "Update this method so that its implementation is not identical to duplicatedMethod1"

---

## Etape 9 - Security Hotspots

**Action** : Navigation vers la section Security Hotspots.

![Security Hotspots](captures/17_security_hotspots.png)

**Ce qu'on voit** :
- 1 Security Hotspot de priorite **HIGH**
- Categorie : **Authentication**
- Message : "'password' detected in this expression, review this potentially hard-coded password"
- Statut : **TO REVIEW**
- Le code source avec la ligne 29 surlignee : `String password = "admin123";`
- Onglets disponibles : "Where is the risk?", "What's the risk?", "Assess the risk", "How can I fix it?"

---

## Etape 10 - Metriques et mesures

**Action** : Exploration de la section Measures.

![Page Measures](captures/18_measures_page.png)

### Dette technique

![Dette technique](captures/19_technical_debt.png)

La dette technique est estimee a **2h 32min** pour corriger toutes les issues de maintenabilite.

---

## Etape 11 - Quality Gate

**Action** : Consultation de la configuration du Quality Gate.

![Quality Gate configuration](captures/25_quality_gate_config.png)

Le Quality Gate **Sonar way** definit les conditions :
- Coverage on new code >= 80%
- Duplicated lines on new code <= 3%
- Maintainability/Reliability/Security rating on new code = A

---

## Etape 12 - Quality Profile

**Action** : Consultation des regles actives dans le profil qualite.

![Quality Profiles](captures/26_quality_profile.png)

Le profil **Sonar way** pour Java contient les regles recommandees par SonarSource.

---

## Etape 13 - Historique et Activity

**Action** : Consultation de l'onglet Activity pour voir l'evolution.

![Activity/Historique](captures/27_activity_history.png)

L'historique montre l'evolution des metriques au fil des analyses.

---

## Etape 14 - Vue du code source

**Action** : Navigation dans le code source directement depuis SonarQube.

![Vue code source](captures/10_code_source_view.png)

![Code avec annotations](captures/20_code_avant_correction.png)

---

## Resume des resultats de la demo

| Metrique | Valeur |
|----------|--------|
| Quality Gate | **Passed** |
| Bugs | 1 (NullPointerException) |
| Vulnerabilities | 0 |
| Security Hotspots | 1 (password hard-coded) |
| Code Smells | 16 |
| Dette technique | 2h 32min |
| Coverage | 0.0% |
| Duplications | 0.0% |
| Lignes de code | 50 |
| Complexite cognitive | 17 |
| Reliability rating | C |
| Security rating | A |
| Maintainability rating | C |

---

## Conclusion de la demo

La demonstration prouve que SonarQube peut etre integre dans un cycle reel :
1. **Analyse automatique** : le scanner detecte les problemes sans intervention humaine
2. **Lecture des issues** : chaque probleme est localise et explique
3. **Security Hotspots** : les risques securite sont identifies pour revue
4. **Quality Gate** : une decision claire (pass/fail) pour la livraison
5. **Metriques** : la dette technique est quantifiee et pilotable

Le cycle complet est : **Code -> Analyse -> Issues -> Correction -> Re-analyse -> Decision**

---

*Document redige par le Groupe 5 - SNDAK11 - Mai 2026*
