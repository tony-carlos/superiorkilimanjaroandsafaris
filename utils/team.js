export const fetchTeamMembers = async () => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_TEAM_MEMBERS_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch team members");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }
};
