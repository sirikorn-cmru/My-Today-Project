import type { LifeArea } from '../types'

export function getLifeAreaName(lifeAreas: LifeArea[], lifeAreaId: string): string {
  return lifeAreas.find((la) => la.id === lifeAreaId)?.name ?? ''
}
