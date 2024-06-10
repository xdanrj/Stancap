import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

export function QuoteLoading({
  count = 1,
  baseColor = "#4a4a4a",
  highlightColor = "#808080"
}) {
  return (
    <>
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        <Skeleton count={1} height={90}/>
      </SkeletonTheme>
    </>
  )
}

export function SmallQuoteLoading({
  count = 1,
  baseColor = "#4a4a4a",
  highlightColor = "#808080"
}) {
  return (
    <>
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        <Skeleton count={count} />
      </SkeletonTheme>
    </>
  )
}