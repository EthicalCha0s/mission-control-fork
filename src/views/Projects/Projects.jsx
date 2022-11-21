import { PageLayout, SectionLayout, Line } from "../../components/Layout";
import { projectsData } from "./projects-data/projects";
import Project from "./Project";
import Header from "../../components/Header";

const Projects = () => {
  return (
    <PageLayout>
      <SectionLayout>
        <Header text={"Projects"} />
        <Line />
        {projectsData.map((e, i) => (
          <Project key={i} active={e.active} title={e.title} deadline={e.deadline} startDate={e.startDate} teamLeads={e.teamLeads} link={e.link} body={e.body} tags={e.tags} />
        ))}
      </SectionLayout>
    </PageLayout>
  );
};

export default Projects;
