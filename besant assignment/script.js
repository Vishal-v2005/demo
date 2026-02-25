function getFormData() {
    const form = document.getElementById("resume-form");
    const data = new FormData(form);

    const skillsRaw = (data.get("skills") || "").toString();
    const experienceRaw = (data.get("experience") || "").toString();
    const educationRaw = (data.get("education") || "").toString();

    return {
        fullName: data.get("fullName")?.toString().trim() || "Your Name",
        title: data.get("title")?.toString().trim() || "Your Title",
        email: data.get("email")?.toString().trim() || "",
        phone: data.get("phone")?.toString().trim() || "",
        location: data.get("location")?.toString().trim() || "",
        website: data.get("website")?.toString().trim() || "",
        summary: data.get("summary")?.toString().trim() || "",
        skills: skillsRaw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        experience: experienceRaw
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean),
        education: educationRaw
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean),
        template: data.get("template")?.toString() || "template-classic",
    };
}

function createContactLine(label, value) {
    if (!value) return "";
    if (label === "website") {
        return `<span><a href="${value}" target="_blank" rel="noopener noreferrer">${value}</a></span>`;
    }
    return `<span>${value}</span>`;
}

function renderClassicTemplate(data) {
    return `
        <div class="resume-inner template-classic">
            <header class="resume-header">
                <div class="resume-name">${data.fullName}</div>
                <div class="resume-title">${data.title}</div>
                <div class="resume-contact">
                    ${createContactLine("email", data.email)}
                    ${createContactLine("phone", data.phone)}
                    ${createContactLine("location", data.location)}
                    ${createContactLine("website", data.website)}
                </div>
            </header>

            ${data.summary ? `
            <section class="resume-section">
                <h3>Summary</h3>
                <p class="resume-summary">${data.summary}</p>
            </section>` : ""}

            ${data.skills.length ? `
            <section class="resume-section">
                <h3>Skills</h3>
                <div class="resume-chips">
                    ${data.skills.map((s) => `<span class="chip">${s}</span>`).join("")}
                </div>
            </section>` : ""}

            ${data.experience.length ? `
            <section class="resume-section">
                <h3>Experience</h3>
                <ul class="resume-list">
                    ${data.experience.map((e) => `<li>${e}</li>`).join("")}
                </ul>
            </section>` : ""}

            ${data.education.length ? `
            <section class="resume-section">
                <h3>Education</h3>
                <ul class="resume-list">
                    ${data.education.map((e) => `<li>${e}</li>`).join("")}
                </ul>
            </section>` : ""}
        </div>
    `;
}

function renderModernTemplate(data) {
    return `
        <div class="resume-inner template-modern">
            <header class="resume-header">
                <div class="resume-name">${data.fullName}</div>
                <div class="resume-title">${data.title}</div>
                <div class="resume-contact">
                    ${createContactLine("email", data.email)}
                    ${createContactLine("phone", data.phone)}
                    ${createContactLine("location", data.location)}
                    ${createContactLine("website", data.website)}
                </div>
            </header>

            <aside class="resume-sidebar">
                ${data.summary ? `
                <section class="resume-section">
                    <h3>Summary</h3>
                    <p class="resume-summary">${data.summary}</p>
                </section>` : ""}

                ${data.skills.length ? `
                <section class="resume-section">
                    <h3>Skills</h3>
                    <div class="resume-chips">
                        ${data.skills.map((s) => `<span class="chip">${s}</span>`).join("")}
                    </div>
                </section>` : ""}
            </aside>

            <main class="resume-main">
                ${data.experience.length ? `
                <section class="resume-section">
                    <h3>Experience</h3>
                    <ul class="resume-list">
                        ${data.experience.map((e) => `<li>${e}</li>`).join("")}
                    </ul>
                </section>` : ""}

                ${data.education.length ? `
                <section class="resume-section">
                    <h3>Education</h3>
                    <ul class="resume-list">
                        ${data.education.map((e) => `<li>${e}</li>`).join("")}
                    </ul>
                </section>` : ""}
            </main>
        </div>
    `;
}

function renderMinimalTemplate(data) {
    return `
        <div class="resume-inner template-minimal">
            <header class="resume-header">
                <div class="resume-name">${data.fullName}</div>
                <div class="resume-title">${data.title}</div>
                <div class="resume-contact">
                    ${createContactLine("email", data.email)}
                    ${createContactLine("phone", data.phone)}
                    ${createContactLine("location", data.location)}
                    ${createContactLine("website", data.website)}
                </div>
            </header>

            ${data.summary ? `
            <section class="resume-section">
                <h3>Summary</h3>
                <p class="resume-summary">${data.summary}</p>
            </section>` : ""}

            ${data.skills.length ? `
            <section class="resume-section">
                <h3>Skills</h3>
                <div class="resume-chips">
                    ${data.skills.map((s) => `<span class="chip">${s}</span>`).join("")}
                </div>
            </section>` : ""}

            ${data.experience.length ? `
            <section class="resume-section">
                <h3>Experience</h3>
                <ul class="resume-list">
                    ${data.experience.map((e) => `<li>${e}</li>`).join("")}
                </ul>
            </section>` : ""}

            ${data.education.length ? `
            <section class="resume-section">
                <h3>Education</h3>
                <ul class="resume-list">
                    ${data.education.map((e) => `<li>${e}</li>`).join("")}
                </ul>
            </section>` : ""}
        </div>
    `;
}

function renderResume() {
    const data = getFormData();
    const preview = document.getElementById("resume-preview");

    // Clear previous template classes
    preview.classList.remove("template-classic", "template-modern", "template-minimal");
    preview.classList.add(data.template, "animate-in");

    let content = "";
    if (data.template === "template-modern") {
        content = renderModernTemplate(data);
    } else if (data.template === "template-minimal") {
        content = renderMinimalTemplate(data);
    } else {
        content = renderClassicTemplate(data);
    }

    preview.innerHTML = content;
}

function initResumeBuilder() {
    const form = document.getElementById("resume-form");
    const inputs = form.querySelectorAll("input, textarea");
    const templateRadios = form.querySelectorAll('input[name="template"]');
    const downloadBtn = document.getElementById("download-pdf");

    // Update live on change / input
    inputs.forEach((el) => {
        const eventName = el.tagName === "TEXTAREA" ? "input" : "input";
        el.addEventListener(eventName, () => {
            renderResume();
        });
    });

    templateRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            renderResume();
        });
    });

    // Prevent default submit and just re-render
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Small visual animation bump
        const preview = document.getElementById("resume-preview");
        preview.classList.remove("animate-in");
        void preview.offsetWidth; // force reflow
        preview.classList.add("animate-in");
        renderResume();
    });

    // Download as PDF (uses browser print → Save as PDF)
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            // Ensure latest data is rendered before printing
            renderResume();
            // Slight delay so DOM updates, then open print dialog
            setTimeout(() => {
                window.print();
            }, 50);
        });
    }

    // Initial render
    renderResume();
}

document.addEventListener("DOMContentLoaded", initResumeBuilder);

