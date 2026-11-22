# Published versions

Each version of the verifier page is pinned on IPFS. A pin is fixed: a later
version gets its own IPFS address and its own row here. Older pins stay valid.

To find which version you hold, compute the SHA-256 of your copy and look for
it in this table.

| Version | IPFS address | SHA-256 | Bytes | Source |
| --- | --- | --- | --- | --- |
| 2026-11-22 | `bafybeiaooetyjbptkzxrffkyzqn2ugcvudir6sugsfjvnalqqlvl77gbqy` | `fb8cb67b8190b8cbbcd5eef2e0ad5bfb617d7d757c53f05bfcd79c25dc017b0f` | 1,323,016 | This repository (webapp commit `1101ca4925d6c86823a298ed7c31b9b2aafd0968`) |
| 2026-11-21 | `bafybeignlglnphx477zx6xq5fv36avwcukq3qlcncp5xt32vfgeizr2lvy` | `b25e351d799c38771df2fd1d2fda673f9245eb8eae8fac86125d09c7fc0d15f4` | 1,418,934 | Not in this repository. That build also read the application's full template library. |

On 2026-11-22 both versions received the same inputs offline: the three
commitment test vectors with a correct and a changed value, 78 template PDFs
plus 4 PDFs with one byte added, and two sample agreement readings. All 92
results were identical.
