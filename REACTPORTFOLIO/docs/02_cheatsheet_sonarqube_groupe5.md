# SONARQUBE - CHEATSHEET
## Groupe 5 | SNDAK11

---

## DEFINITION EN 1 LIGNE
Plateforme d'analyse statique continue du code source (securite, fiabilite, maintenabilite).

---

## PHILOSOPHIE : CLEAN AS YOU CODE
> Ne plus ajouter de dette au nouveau code. Ameliorer progressivement.

---

## 3 AXES DE QUALITE

| Axe | Detecte | Exemples |
|-----|---------|----------|
| Securite | Vulnerabilites, Hotspots | SQL injection, XSS |
| Fiabilite | Bugs | Null pointer, resource leak |
| Maintenabilite | Code Smells, Debt | Duplication, complexite |

---

## TYPES D'ISSUES

| Type | Signification |
|------|---------------|
| Bug | Code incorrect (fiabilite) |
| Vulnerability | Faille securite a corriger |
| Code Smell | Difficile a maintenir |
| Security Hotspot | Code sensible, revue humaine requise |

---

## SEVERITES
**MQR** : Blocker > High > Medium > Low > Info
**Standard** : Blocker > Critical > Major > Minor > Info

---

## CONCEPTS CLES

| Concept | En 1 ligne |
|---------|------------|
| Rule | Standard verifie par l'analyseur |
| Issue | Probleme detecte (localisation + severite + statut) |
| Quality Profile | Regles actives par langage |
| Quality Gate | Seuils pour autoriser la livraison |
| New Code | Code modifie depuis la baseline |
| Metric | Type de mesure (coverage, debt...) |
| Measure | Valeur a un instant (ex: coverage = 82%) |
| Technical Debt | Effort total de correction (en jours) |
| Debt Ratio | Dette / cout de developpement (%) |
| Snapshot | Etat a une analyse donnee |
| Clean as You Code | Strategie : zero nouvelle dette |

---

## QUALITY GATE SONAR WAY (defaut)

| Condition | Seuil |
|-----------|-------|
| Issues nouveau code | 0 |
| Coverage nouveau code | >= 80% |
| Duplications nouveau code | <= 3% |
| Hotspots revus | 100% |

---

## ARCHITECTURE EN 1 SCHEMA

```
Code --> Scanner (CI/CD) --> Rapport --> SonarQube Server --> UI / API
                                              |
                                   [Web + Compute Engine + ES + DB]
```

| Composant | Role |
|-----------|------|
| Web Process | Interface + API |
| Compute Engine | Traitement rapports |
| Elasticsearch | Index/recherche |
| Database | PostgreSQL (prod) |

---

## SCANNERS DISPONIBLES

| Scanner | Usage |
|---------|-------|
| SonarScanner CLI | Projets generiques |
| Scanner Maven | `mvn sonar:sonar` |
| Scanner Gradle | `gradle sonarqube` |
| Scanner .NET | Projets .NET/C# |

---

## PARAMETRES ESSENTIELS

```properties
sonar.projectKey=mon-projet        # Identifiant unique
sonar.host.url=http://localhost:9000  # URL serveur
sonar.token=sqa_xxx                # Token auth
sonar.sources=src                  # Dossier source
sonar.tests=tests                  # Dossier tests
sonar.exclusions=**/*.min.js       # Exclure fichiers
sonar.branch.name=feature-x        # Analyser une branche
sonar.pullrequest.key=42           # Identifier une PR
```

---

## COMMANDES RAPIDES

```bash
# Lancer SonarQube avec Docker
docker run -d -p 9000:9000 sonarqube:lts-community

# Analyse avec Scanner CLI
sonar-scanner -Dsonar.token=TOKEN

# Analyse avec Maven
mvn sonar:sonar -Dsonar.token=TOKEN

# Analyse avec Gradle
gradle sonarqube -Dsonar.token=TOKEN
```

---

## METRIQUES PRINCIPALES

| Metrique | Mesure |
|----------|--------|
| Coverage | % code teste |
| Duplications | % code copie |
| Cyclomatic Complexity | Chemins d'execution |
| Cognitive Complexity | Difficulte humaine |
| Technical Debt | Temps de correction |
| LOC | Lignes de code |

---

## CYCLES DE VIE

**Issue** : Open -> Confirmed -> Fixed / Won't Fix / False Positive -> Closed
**Hotspot** : To Review -> Fixed | Safe

---

## INTEGRATIONS CI/CD
Jenkins | GitHub Actions | GitLab CI | Azure DevOps | Bitbucket Pipelines

---

## EDITIONS

| Edition | Capacites |
|---------|-----------|
| Community | Gratuit, open source |
| Developer | Branches, PR decoration |
| Enterprise | Gouvernance, SCA, portfolios |
| Data Center | Haute disponibilite |

---

## CYCLE DE TRAVAIL EN 7 ETAPES

1. Ecrire le code
2. Push / ouvrir une PR
3. Scanner execute dans la CI
4. Lire le quality gate
5. Corriger les issues
6. Relancer l'analyse
7. Merger si le gate passe

---

## FICHIER MINIMAL sonar-project.properties

```properties
sonar.projectKey=demo-sonarqube
sonar.projectName=Demo SonarQube
sonar.projectVersion=1.0
sonar.sources=src
sonar.tests=tests
sonar.sourceEncoding=UTF-8
sonar.host.url=http://localhost:9000
```

---

## REFERENCES OFFICIELLES
- Documentation : https://docs.sonarsource.com/sonarqube-server/
- Glossaire : https://docs.sonarsource.com/sonarqube-server/glossary
- Clean as You Code : https://docs.sonarsource.com/sonarqube-server/10.8/core-concepts/clean-as-you-code/introduction
- Quality Gates : https://docs.sonarsource.com/sonarqube-server/2026.1/quality-standards-administration/managing-quality-gates/introduction-to-quality-gates
- Analysis Parameters : https://docs.sonarsource.com/sonarqube-server/latest/analyzing-source-code/analysis-parameters/

---
*Groupe 5 - SNDAK11 - Mai 2026*
