import { getJSON } from './http';

export async function getStructureFromArticles(articleIds: string[]) {
    const headingStructures = await Promise.all(
        articleIds.map(async (id) => {
            const articleSections = await getArticleStructure(id);
            const topLevelSections = articleSections.filter((s) => s.toclevel === 1);
            return topLevelSections;
        }),
    );

    const headingSizes = headingStructures.map((s) => s.length);
    const meanNumberOfHeadings = Math.round(headingSizes.reduce((acc, s) => acc + s, 0) / headingSizes.length);

    const headingStructuresToUse = headingStructures.filter((h) => h.length >= meanNumberOfHeadings);

    const sectionHeadings = [];
    for (let i = 0; i < meanNumberOfHeadings; i++) {
        const heading = getMostCommonHeadingAtIndex(headingStructuresToUse, i, sectionHeadings);
        sectionHeadings.push(heading);
    }

    return sectionHeadings;
}

function getMostCommonHeadingAtIndex(headingStructures: SectionDefinition[][], index: number, ignoreHeadings: SectionDefinition[]) {
    const _headingsAtIndex = headingStructures.map((s) => s[index]).filter((a) => a);

    const headingsAtIndex = _headingsAtIndex.filter((h) => {
        const shouldIgnore = ignoreHeadings.some((he) => he.line === h.line);
        return !shouldIgnore;
    });

    const occurrencesOfHeadings = headingsAtIndex.map((h) => {
        return headingsAtIndex.filter((he) => he.line === h.line).length;
    });

    const largestNumOccurrences = Math.max(...occurrencesOfHeadings);
    const indexOfMostCommon = occurrencesOfHeadings.indexOf(largestNumOccurrences);
    const mostPopularHeading = headingsAtIndex[indexOfMostCommon];
    return mostPopularHeading;
}

interface SectionDefinition {
    id: number;
    toclevel: number;
    anchor: string;
    line: string;
}
async function getArticleStructure(articleId: string): Promise<SectionDefinition[]> {
    const mcsRes = await getJSON<any>(`https://cs.wikipedia.org/api/rest_v1/page/mobile-sections/${articleId}`);
    return mcsRes.lead.sections.filter((s: any) => !!s.toclevel);
}
