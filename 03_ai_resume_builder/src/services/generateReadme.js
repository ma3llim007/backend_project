function generateReadme(userData) {
    return `
# ${userData.name}

**${userData.title}**  

## Summary
${userData.summary}

## Experience
${userData.experience.map((exp) => `- **${exp.title}** at ${exp.company} (${exp.dates})\n  ${exp.description}`).join("\n")}

## Skills
${userData.skills.map((skill) => `- ${skill}`).join("\n")}

## Education
${userData.education.map((edu) => `- **${edu.degree} in ${edu.major}** - ${edu.university} (${edu.dates})`).join("\n")}

## Projects
${userData.projects.map((proj) => `### ${proj.project_name}\n${proj.description}`).join("\n\n")}

## Contact Information
- **Email:** ${userData.contact.email}
- **Phone:** ${userData.contact.phone}
- **LinkedIn:** [${userData.contact.linkedin}](${userData.contact.linkedin})
- **GitHub:** [${userData.contact.github}](${userData.contact.github})

## Additional Information
${userData.additionalMessage || "N/A"}
    `;
}

export default generateReadme;
