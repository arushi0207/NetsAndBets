# Research Report
## Connection to MySQL DB through Spring application and docker
### Summary of Work
<!--One paragraph summary of the research being performed-->
My research was revolved around how to get our Spring framework set up to connect to the frontend through endpoints,
as well as how to connect the backend to the MySQL database stored in our VM. I first learned how to create a docker compose
file through various outside resources, as well as devtech 1. After successfully creating a compose file in the VM, I copied the file to my local machine, and went through an online Spring tutorial on setting up the java code and running the application using the docker compose file in my local machine. After going through the tutorial, I am still having some issues testing with Postman. I am also still unaware on how to connect to the VM's docker container, and further research will be needed.
### Motivation
<!--Explain why you felt the need to perform this research-->
I needed this research because I have never used Spring or docker before, and connecting an application to a remote docker container is outside of my knowledge scope. Therefore, I needed to research to better understand how to implement it into my project.
### Time Spent
<!--Explain how your time was spent-->
I spent about 45 minutes researching and creating the docker yml file in the VM, and then about an hour and 15 minutes following the Spring tutorial and migrating my compose file into the project. On top of this, I spent about an hour and a half in Manaswini's and Prof. Swanson's office hours trying to better understand docker and my current issues.
### Results
<!--Explain what you learned/produced/etc. This section should explain the
important things you learned so that it can serve as an easy reference for yourself
and others who could benefit from reviewing this topic. Include your sources as
footnotes. Make sure you include the footnotes where appropriate e.g [^1]-->
After the research, I better understand how docker works and its implementation in general. I have managed to produce a working and running part of the project that listens for post and get calls, but I just need to hash out some minor bugs to make it fully functioning
### Sources
<!--list your sources and link them to a footnote with the source url-->
- Spring tutorial[^1]
- creating docker compose file[^2]
- Devtech 2[^3]
- more on docker compose[^4]
[^1]: https://spring.io/guides/gs/accessing-data-mysql
[^2]: https://vmware.github.io/vic-product/assets/files/html/1.4/vic_app_dev/deploy_multiple_docker_compose.html
[^3]: https://canvas.wisc.edu/courses/447936/assignments/2633862
[^4]: https://medium.com/@chrischuck35/how-to-create-a-mysql-instance-with-docker-compose-1598f3cc1bee
