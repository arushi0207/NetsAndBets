
# Research Report
## Research on connection from Docker and MySQL in a VM
### Summary of Work
Research included watching online tutorials and reading articles about how docker works,
as well as how to setup our SQL database. With this information, I should be able to create
a connection to the DB from our local machines, therefore being able to use it within the project.
### Motivation
<!--Explain why you felt the need to perform this research-->
While we have had Devtechs and tutorials about docker and the VM, I was still pretty lost on how to
set up one for our project. I feel like we did learn a lot in class, but the copy/paste style
doesn't really work for me. There was little explanation on how to integrate this into our own 
projects, and so I sought out more information on my own.
### Time Spent
<!--Explain how your time was spent-->
Most of my time spent has been re-looking through Devtech 2 and the in-class docker tutorial.
I have also spent time looking at various websites and youtube videos explaining docker-mysql
connections. (2 hrs total)
### Results
<!--Explain what you learned/produced/etc. This section should explain the
important things you learned so that it can serve as an easy reference for yourself
and others who could benefit from reviewing this topic. Include your sources as
footnotes. Make sure you include the footnotes where appropriate e.g [^1]-->
I learned a lot about how to create a myseql database within a docker container. One of the
most confusing aspects was what ports I should be using, but now I understand that 3306:3306
is common for most DBs inside a container. I also understand that images are frameworks to
setup the container, and I better understand how to connect via local machines.
### Sources
<!--list your sources and link them to a footnote with the source url-->
- Simple tutorial article[^1]
- Tutorial video and guide[^2]
- Docker Image[^3]
- DevTech 1[^4]
- Docker/MySQL Tutorial[^5]
[^1]: https://medium.com/@maravondra/mysql-in-docker-d7bb1e304473
[^2]: https://www.databasestar.com/database-docker/
[^3]: https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/
[^4]: https://canvas.wisc.edu/courses/447936/assignments/2628453
[^5]: https://canvas.wisc.edu/courses/447936/pages/docker-mysql-1-commands?module_item_id=8277893
