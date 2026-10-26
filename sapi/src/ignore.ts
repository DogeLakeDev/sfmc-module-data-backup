/** 计分板恢复排除名单与过滤纯函数。 */

/**
 * 默认恢复排除名单：为空，即全量恢复。
 * 使用场景：仅作用于 backup.restoreScoreboard；快照与查询始终全量，不区分计分板归属。
 * 管理员可在配置 scoreboard.ignore_objectives 中填写不希望被回滚的计分板。
 */
export const DEFAULT_IGNORE: string[] = [];

/** 是否应在恢复时跳过该 objective。 */
export function shouldIgnoreObjective(
  objectiveId: string,
  ignoreList: string[] = DEFAULT_IGNORE,
): boolean {
  return ignoreList.includes(objectiveId);
}

/** 过滤待恢复的分数行。 */
export function filterScoreRows<T extends { objective: string }>(
  rows: T[],
  ignoreList: string[] = DEFAULT_IGNORE,
): T[] {
  return rows.filter((r) => !shouldIgnoreObjective(r.objective, ignoreList));
}

/** 生成快照代际 id。 */
export function newSnapshotId(now = Date.now()): string {
  return `sb_${now}`;
}
