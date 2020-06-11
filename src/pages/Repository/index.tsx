import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

import logo from '../../assets/github_logo.svg';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issues {
  id: number;
  title: string;
  user: {
    login: string;
  };
  html_url: string;
}

const Repository: React.FC = () => {
  const { repository } = useParams<RepositoryParams>();

  const [userData, setUserData] = useState<Repository | null>(null);
  const [issuesData, setIssuesData] = useState<Issues[]>([]);

  useEffect(() => {
    async function loadIssues(): Promise<void> {
      const [user, issues] = await Promise.all([
        api.get(`repos/${repository}`),
        api.get(`repos/${repository}/issues`),
      ]);

      setUserData(user.data);
      setIssuesData(issues.data);
    }

    loadIssues();
  }, [repository]);

  return (
    <>
      <Header>
        <img src={logo} alt="github explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {userData && (
        <RepositoryInfo>
          <header>
            <img src={userData.owner.avatar_url} alt={userData.owner.login} />
            <div>
              <strong>{userData.full_name}</strong>
              <p>{userData.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{userData.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{userData.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{userData.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issuesData &&
          issuesData.map((issue) => (
            <a key={issue.id} href={issue.html_url}>
              <div>
                <strong>{issue.title}</strong>
                <p>{issue.user.login}</p>
              </div>

              <FiChevronRight size={20} />
            </a>
          ))}
      </Issues>
    </>
  );
};

export default Repository;
