import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

export function QuoteLoading({
  count = 1,
  baseColor = "#4a4a4a",
  highlightColor = "#808080"
}) {
  return (
    <div>
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton key={index} height={90} style={{ marginBottom: "2.8rem" }} />
        ))}
      </SkeletonTheme>
    </div>
  )
}

export function MinimalQuoteLoading({
  count = 1,
  baseColor = "#4a4a4a",
  highlightColor = "#808080"
}) {
  return (
    <div>
      <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton key={index} height={50} style={{ marginBottom: "2.8rem" }} />
        ))}
      </SkeletonTheme>
    </div>
  )
}