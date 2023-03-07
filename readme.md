# Speedykom Final Exam

Task Description:
You are tasked with designing, architecting and developing a data integration and analytics
application for health data in Africa, Sierra Leone (DHIS2: <https://play.dhis2.org> ) or in the EU
(<https://www.ecdc.europa.eu/en/data/downloadable-datasets>) or any other data source for health
that you may access to. The application should allow users to extract, transform and load (ETL) data
from various sources and perform analysis on the data. The application should be scalable, secure,
and maintainable. You can use as a first data source DHIS2 instance like: <https://play.dhis2.org> and
it’s important and mandatory to integrate additional data sources.

Requirements:

1. Describe, Design and develop a data model for the health data in a national or regional
   context, including entities, attributes and relationships. Use an appropriate database for
   storing the data.
2. Develop a data ingestion pipeline that extracts data from multiple sources and loads it into
   the database. The pipeline should be scalable, fault-tolerant and efficient.
3. Develop a backend API that exposes endpoints to allow users to query and retrieve data
   from the database. The API should be secure and well-documented.
4. Develop a frontend application that provides a user interface for the data analytics, you can
   use and integrate Apache superset dashboard or Kibana-dashboard as an iframe. The
   frontend should be responsive and user-friendly.
5. Containerize the applications using Docker or similar containerization technology, and
   deploy them to a cloud environment or on-premise servers.
6. Implement a Single Sign-On (SSO) authentication mechanism to secure the API and frontend
   applications.
7. Implement a workflow management system to orchestrate the ETL process, such as Apache
   Airflow (ideally) or Luigi.
8. Develop a comprehensive testing strategy, including unit tests, integration tests, and endto-end tests.
   Additional Features:
9. Allow users to upload new data to the application via a user interface and create use of this
   new uploaded or updated data.
10. Develop additional data analytics features, such as data visualization tools or predictive
    models.
11. Develop a feature to send alerts to users based on certain data thresholds.
12. Develop a feature to export data to CSV, Excel files and PDF.

Additional Technologies:

1. Use Apache Spark, Apache Flink or other distributed computing frameworks to improve the
   performance of the ETL process.
2. Use a message queuing and caching technology such as Redis, RabbitMQ or Apache Kafka to
   enhance the performance and scalability of the application.
3. Use a search engine technology such as Elasticsearch, Apache Solr or Algolia to provide fulltext search capabilities.
4. Use a modern frontend framework such as React, Vue.js or Angular to develop the frontend
   application.
   Deliverables:
5. A database schema that defines the data model for the health data.
6. A data ingestion pipeline that extracts data from multiple sources and loads it into the
   database.
7. A backend API that exposes endpoints for querying and retrieving data from the database.
   The API should be secured using Single Sign-On.
8. A frontend application that provides a user interface for the data analytics.
9. Container images for the applications that can be deployed to a cloud environment or onpremise servers.
10. Deployment instructions for deploying the applications to a server or cloud environment
    using containerization technology.
11. A testing suite that covers all aspects of the application.

Git Repository:
The candidate is required to create a Git repository for the project and share it with the evaluator.
The repository should include all code, documentation and configuration files related to the project.
The repository should be updated regularly with the latest changes and commits. The evaluator will
use the repository to review the candidate's work and provide feedback.
Timeline:
This task is expected to take 3 days to complete. Here is a rough breakdown of the expected
timeline:

- Day 1: Design and develop the database schema and data ingestion pipeline.
- Day 2: Develop the backend API and frontend application.
- Day 3: Containerize the applications using Docker or similar containerization technology, and
  deploy them to a cloud environment or on-premise servers. Implement Single Sign-On
  authentication mechanism and workflow management system. Develop and execute a
  testing strategy. Implement additional features and technologies as desired by the
  candidate.
- The candidate is encouraged to showcase their skills and expertise by implementing
  additional features and technologies beyond the main requirements, as listed above.
  However, the main requirements should still be completed within the given timeline of 3
  days.
- Once the candidate has started the development work, they should share the Git repository
  with the Speedykom team by sending this to the E-Mail addresses CCd for the interview as
  soon as possible to allow for ongoing feedback and review. The repository should be updated
  regularly with the latest changes and commits. At the end of the 3-day period, the candidate
  should provide a final demonstration of the application to the Speedykom team, showcasing
  its functionality, usability and performance. It’s mandatory to describe in text and graph
  what the app can do and its scalability potential.


## Built With

- Nest.js Micreservice
- RabbitMQ
- PostgresSQL
- Redis

## Authors

👤 **Ishmael Kargbo**

- GitHub: [@githubhandle](https://github.com/ishmaelkargbo)
- Twitter: [@twitterhandle](https://twitter.com/ishodev)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/ishmael-kargbo-503660169)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/IshmaelKargbo/fix-exam/issues).

## Show your support

Give a ⭐️ if you like this project!
