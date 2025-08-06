import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss';

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="Jul 2025 – Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Teaching Assistant – Natural Language Processing (Dr. Reza Ramezani)
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              University of Isfahan
            </h4>
            <h5 className="vertical-timeline-element-subtitle">
              Isfahan Province, Iran
            </h5>
            <p>
              Assisted in course preparation including syllabus design, resource compilation (GitHub, Kaggle, academic courses, books).
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jun 2025 – Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Co-Developer & AI Agent Engineer
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Isfahan University of Medical Sciences
            </h4>
            <h5 className="vertical-timeline-element-subtitle">
              Isfahan, Iran (Remote)
            </h5>
            <p>
              Co-developing a conversational AI assistant for a digital maternal care platform, designing long-term user memory, ensuring ethical AI use, and building initial frontend components.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Jun 2025 – Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Admin & Content Creator
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Dunijet | دانیجت
            </h4>
            <p>
              Tracking LLM/NLP/AGI research, writing summaries and explainers, and creating educational posts for a broad audience.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Apr 2025 – Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Marathon Trainee – Personal Challenge
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Self-Directed
            </h4>
            <p>
              Embracing balance beyond code: endurance training, personal growth, and pushing limits outside the tech world.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Apr 2025 – Jun 2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Teaching Assistant – Semantic Web & Knowledge Graph (Dr. Reza Ramezani)
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              University of Isfahan
            </h4>
            <h5 className="vertical-timeline-element-subtitle">
              Isfahan Province, Iran
            </h5>
            <p>
              Led the “Association Rules” module, delivered interactive sessions, designed practical assignments, and conducted practical exams.
            </p>
          </VerticalTimelineElement>

          {/* New conference booth entry */}
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Feb 24 – Feb 26, 2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Booth Lead – Big Data Group,<br/>
              1st National Biennial Conference on AI in Traffic Control
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              University of Isfahan
            </h4>
            <h5 className="vertical-timeline-element-subtitle">
              Isfahan, Iran
            </h5>
            <p>
              Presented the Big Data group’s achievements and facilitated discussions on urban and road management solutions at the conference.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Dec 2024 – May 2025"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              AI Workshop Mentor
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Esfahan’s Mobarakeh Steel Company
            </h4>
            <h5 className="vertical-timeline-element-subtitle">
              Isfahan Province, Iran
            </h5>
            <p>
              Co-facilitated 9 hands-on GenAI sessions for 400+ executives, covering tools like ChatGPT, Grok, Gemini, DeepSeek, Qwen, Krea, and more.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Nov 2024 – Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              RAG Branch Member
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              University of Isfahan
            </h4>
            <p>
              Contributing to Retrieval-Augmented Generation research, developing agentic systems, and collaborating in weekly research meetings.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Oct 2024 – Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Big Data Branch Member
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              University of Isfahan
            </h4>
            <p>
              Collaborating on big data research with faculty and graduate students, innovating in data science and scalable infrastructure.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Nov 2023 – Nov 2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Researcher & Elite Club Member
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Islamic Azad University
            </h4>
            <p>
              Authored books on Python, Git, and GitHub, and engaged in high-impact academic research with the elite club.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Apr 2023 – Mar 2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Teaching Assistant – Programming Fundamentals
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Islamic Azad University
            </h4>
            <p>
              Guided students in C++ fundamentals, real-world examples, clean code practices, and soft skills development.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Feb 2023 – May 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Intern – IT Department
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              SnappCarFix
            </h4>
            <p>
              Learned system architectures, collaborated on problem-solving, and honed teamwork and communication skills.
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Aug 2022 – Nov 2022"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">
              Research Assistant
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Islamic Azad University
            </h4>
            <p>
              Collaborated on a historical research book about Cyrus the Great, analyzed primary sources, and contributed to scholarly publication.
            </p>
          </VerticalTimelineElement>

        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;
