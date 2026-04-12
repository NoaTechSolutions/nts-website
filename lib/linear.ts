import { LinearClient } from "@linear/sdk";

function getClient(): LinearClient {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) throw new Error("LINEAR_API_KEY is not set in environment");
  return new LinearClient({ apiKey });
}

export async function createIssue(params: {
  title: string;
  description?: string;
  teamId: string;
  projectId?: string;
  priority?: number; // 0=no priority, 1=urgent, 2=high, 3=medium, 4=low
  labelIds?: string[];
  stateId?: string;
}) {
  const client = getClient();
  const payload = await client.createIssue({
    title: params.title,
    description: params.description,
    teamId: params.teamId,
    projectId: params.projectId,
    priority: params.priority,
    labelIds: params.labelIds,
    stateId: params.stateId,
  });
  const issue = await payload.issue;
  if (!issue) throw new Error("Failed to create issue");
  return issue;
}

export async function updateIssueStatus(issueId: string, stateId: string) {
  const client = getClient();
  const payload = await client.updateIssue(issueId, { stateId });
  const issue = await payload.issue;
  if (!issue) throw new Error(`Failed to update issue ${issueId}`);
  return issue;
}

export async function addComment(issueId: string, body: string) {
  const client = getClient();
  const payload = await client.createComment({ issueId, body });
  const comment = await payload.comment;
  if (!comment) throw new Error(`Failed to add comment to issue ${issueId}`);
  return comment;
}

export async function getTeamIssues(teamId: string, projectId?: string) {
  const client = getClient();
  const result = await client.issues({
    filter: {
      team: { id: { eq: teamId } },
      ...(projectId ? { project: { id: { eq: projectId } } } : {}),
    },
  });
  return result.nodes;
}
